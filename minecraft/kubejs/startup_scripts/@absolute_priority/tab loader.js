
const coloredBlocks = []

ForgeEvents.onEvent('net.minecraftforge.event.BuildCreativeModeTabContentsEvent', event => {

    // console.log(event.getTab().displayName.getString())

    let tab = event.getTab().displayName.getString()
    if (tab !== 'Decoration') return

    event.entries.forEach(entry => {
        if (entry.key.id.includes('another_furniture')) return;
        coloredBlocks.push(entry.key.id)
    })
    // console.log('Item added to decoration: ' + coloredBlocks)
})