ForgeEvents.onEvent('top.theillusivec4.curios.api.event.CurioChangeEvent', event => {
  let player = event.entity

  let slot = event.identifier.toString()

  let itemOut = event.from.id
  let itemIn = event.to.id
  let itemCount = event.to.count

  if (slot == 'back_weapon') {
    if (event.to.getRarity() == 'TWO_HAND' || event.to.getRarity() == 'ONE_HAND') {
      player.sendData('darkages:sound', {
        sound: 'epicfight:entity.weapon.sword_in'
      })
    }

    if (event.from.getRarity() == 'TWO_HAND') {
      player.sendData('darkages:sound', {
        sound: 'darkages:draw_heavy'
      });
    }

    if (event.from.getRarity() == 'ONE_HAND') {
      player.sendData('darkages:sound', {
        sound: 'darkages:draw_light'
      });
    }

    if (itemIn == 'minecraft:air') {
      syncVariable(player, 'backItem', false);
      syncVariable(player, 'backCount', 0)
      return;
    }

    syncVariable(player, 'backItem', itemIn);
    syncVariable(player, 'backCount', itemCount);
  }

  if (slot == 'spellbook' && itemIn.includes('spell_book') && !player.tags.contains('spell_book_equip')) {
    player.tags.add('spell_book_equip');
    player.tell([Text.of(`Hold \uE313 to open the Spell Wheel. `).italic(), Text.of(`Press \uE213 to cast a spell.`).italic()])
    return;
  }

  if (slot == 'back' && itemIn.includes('backpack') && !player.tags.contains('backpack_equip')) {
    player.tags.add('backpack_equip');
    player.tell(Text.of(`While crouching, press \uE813 to open your backpack.`))
  }
})
