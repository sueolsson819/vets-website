# Push notifications

To demo this branch, run the following command from within this directory:

```
node index.js
```

Make sure you are running `vets-website` with `yarn watch` in another terminal. Navigate to an app in the browser and you should see the server log `REGISTERING` due to a fetch call. Once that's done, hit `localhost:4000/trigger` to have the server send an event to the frontend.
