function isIronsSpellbooksLine(lineComp) {
  if (lineComp.getContents && lineComp.getContents().getKey) {
    let key = lineComp.getContents().getKey();
    if (key && key.includes("irons_spellbooks")) return true;
  }

  let sibs = lineComp.getSiblings();
  for (let j = 0; j < sibs.size(); j++) {
    let sib = sibs.get(j);
    if (sib.getContents && sib.getContents().getKey) {
      let key = sib.getContents().getKey();
      if (key && key.includes("irons_spellbooks")) return true;
    }
  }

  return false;
}

function filterIronsLines(tooltip, showDetails) {
  let foundIrons = false;

  for (let i = tooltip.size() - 1; i >= 1; i--) {
    let lineComp = tooltip.get(i);

    if (isIronsSpellbooksLine(lineComp)) {
      foundIrons = true;

      if (!showDetails) {
        tooltip.remove(i);
      }
    }
  }

  return foundIrons;
}

function addImbuedTagIfNeeded(tooltip, foundIrons, showDetails) {
  if (foundIrons && !showDetails) {
    tooltip.add(Text.of("Imbued").gold());
  }
}

NativeEvents.onEvent(
  EventPriority.LOWEST,
  true,
  ItemTooltipEvent,
  event => {

    let stack = event.getItemStack();
    let item = stack.getItem();

    if (!(item instanceof SwordItem) && !(item instanceof BowItem)) return;

    let tooltip = event.getToolTip();
    let showDetails = Screen.hasShiftDown();

    let foundIrons = filterIronsLines(tooltip, showDetails);

    addImbuedTagIfNeeded(tooltip, foundIrons, showDetails);
  }
);

NativeEvents.onEvent(
  EventPriority.LOWEST,
  true,
  ItemTooltipEvent,
  event => {
    let tooltip = event.getToolTip();
    let stack = event.getItemStack()
    let item = stack.getItem();

    // console.log(tooltip)

    let removals = [
      'mainhand',
      'when in spell book',
      'unaware',
      'distract',
      'dragon breath attacks',
      'damage against',
      'provides',
      's cooldown',
      'attack',
      'when in main',
      'entity reach',
      'swing cost',
      'tipping uses',
      'kg',
      'held',
      'can be imbued',
      'max damage',
      'frame:',
      'tent color',
      'to pack'
    ]

    let shiftRemovals = [
      'ecliptic',
      'irons_spellbooks.scroll_tooltip',
      'irons_spellbooks.mana_cost',
      'irons_spellbooks.cooldown_length_seconds',
    ]

    let bowRemovals = [
      'pierce'
    ]

    tooltip.removeIf(c => {
      let raw = String(c.getString());   // convert to JS string
      let text = raw.trim().toLowerCase();

      if (text.length === 0) {
        return true;
      }

      let key = "";
      let contents = c.getContents();
      if (contents.getKey) {
        key = contents.getKey().toLowerCase();
      }

      if (c.equals(Component.empty())) return true;

      if (contents.toString().startsWith(' ')) return true;

      for (let i = 0; i < bowRemovals.length; i++) {
        if (text.includes(bowRemovals[i]) &&
          !Screen.hasShiftDown() &&
          (item instanceof BowItem || item instanceof CrossbowItem)) {
          return true;
        }
      }

      for (let i = 0; i < shiftRemovals.length; i++) {
        if (!Screen.hasShiftDown() &&
          (text.includes(shiftRemovals[i]) || key.includes(shiftRemovals[i]))) {
          return true;
        }
      }

      for (let i = 0; i < removals.length; i++) {
        if (text.includes(removals[i])) return true;
      }

      return false;
    });
  }
);