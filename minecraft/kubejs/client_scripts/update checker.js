ClientEvents.tick(event => {
  let updateCheck = String($VariableHandler.getVariable('update_start').value);
  if (updateCheck != 'true') return;

  let content = JsonIO.read('update.json');
  if (!content || !content.file_locations) {
    console.log('ERROR: update.json not found.')
    return;
  }

  let githubPrefix = "https://raw.githubusercontent.com/Illest8/DarkAges/main/minecraft/";

  let fileCount = content.file_locations.length;
  let asset = false;
  let reload = false;
  let restart = false;

  content.file_locations.push('version.txt')

  content.file_locations.forEach(location => {
    let url = githubPrefix + location;

    if (location.includes('startup') || location.includes('mod') || location.includes('config')) {
      restart = true;
    }

    if (location.includes('assets') || location.includes('client_scripts')) {
      asset = true;
    }

    if (location.includes('data') || location.includes('server_scripts')) {
      reload = true;
    }

    console.log(`Downloading update for ${location}`)

    FetchJS.download(
      url,
      location,
      progress => {
        let pct = Math.round(progress * 100);
        $VariableHandler.setVariable('update_progress', `Downloading ${location} (${pct}%)`),
        true;
      }
    );
  });

  if (!restart) {
    if (asset) {
      Client.player.tell('This update changed some textures. §6Reload your assets (F3+T).')
    }
    if (reload) {
      Client.player.tell('This update changed some data. §6Reload your world to see these changes!')
    }
  }
  else {
    Client.player.tell('§6This update requires you to restart your game.')
  }

  Client.player.tell(`Updated ${fileCount} files.`)
  $VariableHandler.setVariable('update_progress', 'Complete.')
  $VariableHandler.setVariable('update_start', 0);
});
