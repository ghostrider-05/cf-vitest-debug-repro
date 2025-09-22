# Bug repro

Steps:

- clone and run `npm install` on Windows (see bug details for OS used)
- run `npm run coverage`

See the logs with:

```txt
vitest-pool-worker: Unable to remove temporary directory: Error: EBUSY: resource busy or locked, rmdir 'C:\Users\user\AppData\Local\Temp\miniflare-81a2d4476a4a6888f995c3c81fe4c618\cache\miniflare-CacheObject'
vitest-pool-worker: Unable to remove temporary directory: Error: EBUSY: resource busy or locked, rmdir 'C:\Users\user\AppData\Local\Temp\miniflare-81a2d4476a4a6888f995c3c81fe4c618\d1\miniflare-D1DatabaseObject'
```

Observe that the miniflare directory is deleted when aborting the coverage, but the process warns it is not being able to delete it.
