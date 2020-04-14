# clapHelp
<img src="/public/images/og_image.png" width="300px">
non-profit colombian initiative to help and support those that are actively fighting COVID-19 around the globe.
This app intends to offer tools to the public, allowing them to show gratitude, support and aid to people around the world that have to put on against the current pandemic.

## Contributing
You're welcome to contribute by working on any of the current [issues](/issues). Here's a detailed step-by-step instruction on how to successfully contribute:
- ### Set up your local environment
  To make it easier for you to modify the code and experiment without any hassles, you have to [fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) this repo.
  
  Once you have your own fork, clone it on your computer with
  ```
  git clone https://github.com/<YOUR-USERNAME-HERE>/clapHelp
  cd clapHelp
  ```
  you should now be inside a local copy of this repo. Now make sure to have a remote reference to this repo, so you're always up to date.
  ```
  git remote add upstream https://github.com/mjimenezleon13/clapHelp.git
  ```
  
- ### Select an issue and create a new branch
  If you want to help us with a specific issue, please let us know! Go inside the issue and say **_I'll work on this_**. This let's others know they can focus on other issues, and reduce repeated work (and therefore wasted hours for you and others).
  
  Once you know what you want to do, ensure you have the most recent changes on your repo, and then create a branch for this issue
  ```
  git pull upstream master
  git push origin master
  git checkout -b branch-name
  ```
  
- ### Running the app locally
  You're almost there! This app uses firebase, and therefore you need to have the [**Firebase CLI**](https://firebase.google.com/docs/cli?hl=vi) running and your account authenticated to run the app locally. Also ensure you have the [**gcloud SDK**](https://cloud.google.com/sdk/docs#linux) installed and to have credentials to use for Application Default Credentials (aka. `gcloud auth application-default login`).
  
  With all that set, you can now install all npm dependencies for firebase functions
  ```
  cd functions
  npm install
  cd ..
  ```
  
  Finally! you can run this line of code to have the app running locally.
  ```
  firebase emulators:start
  ```
  If everything was done correctly, you should see the app running at `localhost:5000`. Congratulations!
  
