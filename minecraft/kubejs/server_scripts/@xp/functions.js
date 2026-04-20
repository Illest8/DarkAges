
let SkillsAPI = Java.loadClass('net.puffish.skillsmod.api.SkillsAPI');
let $VariableHandler = Java.loadClass('de.keksuccino.fancymenu.customization.variables.VariableHandler')
let $ServerPlayer = Java.loadClass('net.minecraft.server.level.ServerPlayer')

function resetSkillCategoryProgress(player, categoryIdStr) {
    let experience = getExperienceObject(categoryIdStr);

    if (!experience) {
        console.log("No experience object for category: " + categoryIdStr);
        return false;
    }

    let currentLevel = experience.getLevel(player);

    let xpThreshold = 0;
    for (let lvl = 0; lvl < currentLevel; lvl++) {
        xpThreshold += experience.getRequired(lvl);
    }

    experience.setTotal(player, xpThreshold);

    console.log(`Reset progress for ${player.username} at level ${currentLevel} in category ${categoryIdStr}`);
    return true;
}

function getSkillCategoryLevel(player, categoryIdStr) {
    let experience = getExperienceObject(categoryIdStr);

    if (!experience) {
        console.log("Experience not present for category: " + categoryIdStr);
        return -1;
    }

    return experience.getLevel(player);
}

function getExperienceObject(categoryIdStr) {
    let id = Utils.id(categoryIdStr);
    let optional = SkillsAPI.getCategory(id);

    if (!optional.isPresent()) return null;

    let category = optional.get();
    let categoryClass = category.getClass();
    let experienceMethod = categoryClass.getDeclaredMethod("getExperience");
    experienceMethod.setAccessible(true);

    let experienceOptional = experienceMethod.invoke(category);
    return experienceOptional.isPresent() ? experienceOptional.get() : null;
}
