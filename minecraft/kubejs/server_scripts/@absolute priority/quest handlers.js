
FTBQuestsEvents.completed(event => {
  let completed = event.getObject()

  // logObject(event)

  for (let member of event.getOnlineMembers()) {
    announceQuestCompletion(member, completed)
  }
})

function announceQuestCompletion(player, quest) {
  if (quest.rawTitle === '') return

  if (quest.getObjectType() === 'CHAPTER') return;

  if (quest.getObjectType() === 'QUEST') {
    let dependants = quest.dependants;
    if (dependants.length > 0) {
      dependants.forEach(dep => {
        if (dep.optional) return;
        FTBQuests.getData(player.level, player.uuid).setQuestPinned(player, dep.id, true);
        player.sendData('darkages:quests', {
          id: dep.id
        }
        )
      })
    }
    return;
  }

  const q = quest.getQuest()

  if (q.dependants.length < 1 && q.optional) {
    return
  }

  q.dependants.forEach(dep => {
    if (dep.optional) return;
    syncVariable(player, 'quest', dep.getCodeString())
    FTBQuests.getData(player.level, player.uuid).setQuestPinned(player, dep.id, true);
    player.sendData('darkages:quests', {
      id: dep.id,
      chapter: dep.getChapter()
    }
    )
  })

  if (q.questChapter.isAlwaysInvisible()) return;

  player.sendData('darkages:sound', {
    sound: 'darkages:quest_complete'
  })
}

function completeQuest(player, questId) {
  let data = FTBQuests.getServerDataFromPlayer(player)
  if (!data) {
    console.error("No server data for player")
    return
  }

  data.complete(questId)
}

function questCompleted(player, questId) {
  return FTBQuests.getServerDataFromPlayer(player).isCompleted(questId);
}

function questAvailable(player, questId) {
  if (questCompleted(player, questId)) {
    return 0;
  }
  return FTBQuests.getServerDataFromPlayer(player).canStartQuest(questId)
}

function questChangeProgress(player, questid, amount) {
  return FTBQuests.getServerDataFromPlayer(player).changeProgress(questid, amount)
}

function questProgessAdd(player, questId, amount) {
  return FTBQuests.getServerDataFromPlayer(player).addProgress(questId, amount)
}

function taskProgress(player, taskId) {
  return FTBQuests.getServerDataFromPlayer(player).getTaskProgress(taskId)
}

function resetChapter(player, chapterId) {
  return FTBQuests.getServerDataFromPlayer(player).reset(chapterId)
}