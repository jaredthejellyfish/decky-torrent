import os
import random
import subprocess
import time
import decky_plugin
import transmission_rpc
import json


def convert_to_serializable(obj):
    """Recursively convert an object to a serializable format."""
    if isinstance(obj, dict):
        return {key: convert_to_serializable(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [convert_to_serializable(item) for item in obj]
    elif hasattr(obj, '__dict__'):
        return convert_to_serializable(obj.__dict__)
    else:
        return obj


def get_client():
    """Create and return a Transmission RPC client."""
    return transmission_rpc.Client(
        host='localhost',
        port=9091,
        password='{a9b92a286ec3aa3b772fc6ee86461248240f27960YseRA10',
        username='deckytorrent'
    )


def handle_exception(exception, custom_message):
    """Log an error and return a JSON response with the error message."""
    decky_plugin.logger.error(f"{custom_message}: {exception}")
    return json.dumps({"success": False, "error": str(exception)})


class Plugin:
    async def random(self):
        return round(random.random() * 1000, 0)

    async def pause_torrent(self, torrent_id):
        try:
            client = get_client()
            client.stop_torrent(torrent_id)
        except transmission_rpc.error.TransmissionError as e:
            return handle_exception(e, "Transmission RPC error")
        except KeyError as e:
            return handle_exception(e, f"Torrent with ID {torrent_id} not found")
        except Exception as e:
            return handle_exception(e, "Unexpected error")

    async def resume_torrent(self, torrent_id):
        try:
            client = get_client()
            client.start_torrent(torrent_id)
        except transmission_rpc.error.TransmissionError as e:
            return handle_exception(e, "Transmission RPC error")
        except KeyError as e:
            return handle_exception(e, f"Torrent with ID {torrent_id} not found")
        except Exception as e:
            return handle_exception(e, "Unexpected error")

    async def get_torrents(self):
        max_retries = 5
        retry_delay = 5  # seconds

        for attempt in range(max_retries):
            try:
                client = get_client()
                torrents = client.get_torrents()
                return json.dumps({"torrents": convert_to_serializable(torrents)})
            except transmission_rpc.error.TransmissionError as e:
                decky_plugin.logger.error(f"Transmission RPC error: {e}")
                if attempt < max_retries - 1:
                    decky_plugin.logger.info(
                        f"Retrying in {retry_delay} seconds...")
                    time.sleep(retry_delay)
                else:
                    return json.dumps({"error": "Failed to connect to Transmission daemon after multiple attempts"})
            except Exception as e:
                return handle_exception(e, "Unexpected error")

    async def add_torrent_from_path(self, path):
        try:
            client = get_client()
            torrent = client.add_torrent(path)
            return json.dumps({"success": True, "torrent_id": torrent.id, "torrent_name": torrent.name})
        except transmission_rpc.error.TransmissionError as e:
            return handle_exception(e, "Transmission RPC error")
        except FileNotFoundError as e:
            return handle_exception(e, f"File {path} not found")
        except Exception as e:
            return handle_exception(e, "Unexpected error")

    async def _main(self):
        decky_plugin.logger.info("Hello World!")

        client = None
        try:
            client = transmission_rpc.Client(
                host='localhost',
                port=9091,
                password='{a9b92a286ec3aa3b772fc6ee86461248240f27960YseRA10',
                username='deckytorrent'
            )
            client.session_stats()
            decky_plugin.logger.info("Transmission daemon is already running.")
        except transmission_rpc.error.TransmissionError:
            decky_plugin.logger.info(
                "Transmission daemon is not running. Starting the daemon.")
            command = "transmission-daemon -g ~/.config/transmission-daemon/"
            try:
                subprocess.run(command, shell=True, check=True)
                decky_plugin.logger.info(
                    "Transmission daemon started successfully.")
            except subprocess.CalledProcessError as e:
                decky_plugin.logger.error(
                    f"An error occurred while starting the Transmission daemon: {e}")

    async def _unload(self):
        decky_plugin.logger.info("Goodnight World!")

    async def _uninstall(self):
        decky_plugin.logger.info("Goodbye World!")

    async def _migration(self):
        decky_plugin.logger.info("Migrating")
        decky_plugin.migrate_logs(os.path.join(
            decky_plugin.DECKY_USER_HOME, ".config", "decky-template", "template.log"))
        decky_plugin.migrate_settings(os.path.join(decky_plugin.DECKY_HOME, "settings", "template.json"),
                                      os.path.join(decky_plugin.DECKY_USER_HOME, ".config", "decky-template"))
        decky_plugin.migrate_runtime(os.path.join(decky_plugin.DECKY_HOME, "template"),
                                     os.path.join(decky_plugin.DECKY_USER_HOME, ".local", "share", "decky-template"))
