/**
 * Represents the details of a torrent download.
 */
export type TorrentDetails = {
    fields: {
        /** The date of the last activity in seconds since the Unix epoch. */
        activityDate: number;
        /** The date the torrent was added in seconds since the Unix epoch. */
        addedDate: number;
        /** The priority for bandwidth allocation. */
        bandwidthPriority: number;
        /** A comment about the torrent. */
        comment: string;
        /** The number of times the torrent data was found to be corrupt. */
        corruptEver: number;
        /** The name of the program that created the torrent. */
        creator: string;
        /** The date the torrent was created in seconds since the Unix epoch. */
        dateCreated: number;
        /** The desired available bytes. */
        desiredAvailable: number;
        /** The date the download was completed in seconds since the Unix epoch. */
        doneDate: number;
        /** The directory where the torrent is downloaded. */
        downloadDir: string;
        /** The download speed limit in KB/s. */
        downloadLimit: number;
        /** Whether the download speed is limited. */
        downloadLimited: boolean;
        /** The total number of bytes downloaded. */
        downloadedEver: number;
        /** The date the torrent was last edited in seconds since the Unix epoch. */
        editDate: number;
        /** Error code for the torrent. */
        error: number;
        /** Error string for the torrent. */
        errorString: string;
        /** The estimated time remaining to download the torrent in seconds. */
        eta: number;
        /** The estimated idle time remaining in seconds. */
        etaIdle: number;
        /** The number of files in the torrent. */
        fileCount: number;
        /** Statistics for each file in the torrent. */
        fileStats: Array<{
            /** The number of bytes completed for the file. */
            bytesCompleted: number;
            /** The priority of the file. */
            priority: number;
            /** Whether the file is wanted. */
            wanted: boolean;
        }>;
        /** Information about each file in the torrent. */
        files: Array<{
            /** The number of bytes completed for the file. */
            bytesCompleted: number;
            /** The length of the file in bytes. */
            length: number;
            /** The name of the file. */
            name: string;
        }>;
        /** The group the torrent belongs to. */
        group: string;
        /** The hash string of the torrent. */
        hashString: string;
        /** The number of bytes that are unchecked. */
        haveUnchecked: number;
        /** The number of valid bytes that have been downloaded. */
        haveValid: number;
        /** Whether the torrent honors session limits. */
        honorsSessionLimits: boolean;
        /** The ID of the torrent. */
        id: number;
        /** Whether the torrent is finished. */
        isFinished: boolean;
        /** Whether the torrent is private. */
        isPrivate: boolean;
        /** Whether the torrent is stalled. */
        isStalled: boolean;
        /** Labels associated with the torrent. */
        labels: string[];
        /** The number of bytes left to download. */
        leftUntilDone: number;
        /** The magnet link of the torrent. */
        magnetLink: string;
        /** The time for the next manual announce in seconds since the Unix epoch. */
        manualAnnounceTime: number;
        /** The maximum number of connected peers. */
        maxConnectedPeers: number;
        /** The percentage of metadata that is complete. */
        metadataPercentComplete: number;
        /** The name of the torrent. */
        name: string;
        /** The peer limit for the torrent. */
        peerLimit: number;
        /** List of connected peers. */
        peers: Array<any>;
        /** The number of peers currently connected. */
        peersConnected: number;
        /** The sources from which peers are discovered. */
        peersFrom: {
            /** The number of peers discovered from cache. */
            fromCache: number;
            /** The number of peers discovered from DHT. */
            fromDht: number;
            /** The number of peers discovered from incoming connections. */
            fromIncoming: number;
            /** The number of peers discovered from LPD. */
            fromLpd: number;
            /** The number of peers discovered from LTEP. */
            fromLtep: number;
            /** The number of peers discovered from PEX. */
            fromPex: number;
            /** The number of peers discovered from tracker. */
            fromTracker: number;
        };
        /** The number of peers getting data from us. */
        peersGettingFromUs: number;
        /** The number of peers sending data to us. */
        peersSendingToUs: number;
        /** The percentage of the torrent that is complete. */
        percentComplete: number;
        /** The percentage of the torrent that is done. */
        percentDone: number;
        /** The number of pieces in the torrent. */
        pieceCount: number;
        /** The size of each piece in bytes. */
        pieceSize: number;
        /** The bitfield of pieces that are available. */
        pieces: string;
        /** The primary MIME type of the torrent. */
        primaryMimeType: string;
        /** The priority for each piece of the torrent. */
        priorities: number[];
        /** The position of the torrent in the queue. */
        queuePosition: number;
        /** The current download rate in bytes per second. */
        rateDownload: number;
        /** The current upload rate in bytes per second. */
        rateUpload: number;
        /** The progress of rechecking the torrent. */
        recheckProgress: number;
        /** The number of seconds the torrent has been downloading. */
        secondsDownloading: number;
        /** The number of seconds the torrent has been seeding. */
        secondsSeeding: number;
        /** The idle seeding limit in minutes. */
        seedIdleLimit: number;
        /** The mode for the idle seeding limit. */
        seedIdleMode: number;
        /** The seeding ratio limit. */
        seedRatioLimit: number;
        /** The mode for the seeding ratio limit. */
        seedRatioMode: number;
        /** The total size of the torrent when complete. */
        sizeWhenDone: number;
        /** The date the torrent was started in seconds since the Unix epoch. */
        startDate: number;
        /** The status of the torrent. */
        status: number;
        /** The path to the torrent file. */
        torrentFile: string;
        /** The total size of the torrent in bytes. */
        totalSize: number;
        /** The list of trackers for the torrent. */
        trackerList: string;
        /** Statistics for each tracker of the torrent. */
        trackerStats: Array<{
            /** The announce URL of the tracker. */
            announce: string;
            /** The state of the announce. */
            announceState: number;
            /** The number of times the tracker has downloaded the torrent. */
            downloadCount: number;
            /** Whether the tracker has announced. */
            hasAnnounced: boolean;
            /** Whether the tracker has scraped. */
            hasScraped: boolean;
            /** The host of the tracker. */
            host: string;
            /** The ID of the tracker. */
            id: number;
            /** Whether the tracker is a backup. */
            isBackup: boolean;
            /** The number of peers discovered during the last announce. */
            lastAnnouncePeerCount: number;
            /** The result of the last announce. */
            lastAnnounceResult: string;
            /** The start time of the last announce. */
            lastAnnounceStartTime: number;
            /** Whether the last announce succeeded. */
            lastAnnounceSucceeded: boolean;
            /** The time of the last announce. */
            lastAnnounceTime: number;
            /** Whether the last announce timed out. */
            lastAnnounceTimedOut: boolean;
            /** The result of the last scrape. */
            lastScrapeResult: string;
            /** The start time of the last scrape. */
            lastScrapeStartTime: number;
            /** Whether the last scrape succeeded. */
            lastScrapeSucceeded: boolean;
            /** The time of the last scrape. */
            lastScrapeTime: number;
            /** Whether the last scrape timed out. */
            lastScrapeTimedOut: boolean;
            /** The number of leechers on the tracker. */
            leecherCount: number;
            /** The time for the next announce in seconds since the Unix epoch. */
            nextAnnounceTime: number;
            /** The time for the next scrape in seconds since the Unix epoch. */
            nextScrapeTime: number;
            /** The scrape URL of the tracker. */
            scrape: string;
            /** The state of the scrape. */
            scrapeState: number;
            /** The number of seeders on the tracker. */
            seederCount: number;
            /** The name of the site hosting the tracker. */
            siteName: string;
            /** The tier of the tracker. */
            tier: number;
        }>;
        /** The list of trackers for the torrent. */
        trackers: Array<{
            /** The announce URL of the tracker. */
            announce: string;
            /** The ID of the tracker. */
            id: number;
            /** The scrape URL of the tracker. */
            scrape: string;
            /** The name of the site hosting the tracker. */
            siteName: string;
            /** The tier of the tracker. */
            tier: number;
        }>;
        /** The upload speed limit in KB/s. */
        uploadLimit: number;
        /** Whether the upload speed is limited. */
        uploadLimited: boolean;
        /** The upload ratio of the torrent. */
        uploadRatio: number;
        /** The total number of bytes uploaded. */
        uploadedEver: number;
        /** Whether the files in the torrent are wanted. */
        wanted: number[];
        /** The list of web seeds for the torrent. */
        webseeds: Array<any>;
        /** The number of web seeds sending data to us. */
        webseedsSendingToUs: number;
    };
};
