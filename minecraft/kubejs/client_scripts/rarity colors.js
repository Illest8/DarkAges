const Rarity = Java.loadClass("net.minecraft.world.item.Rarity");
const UnaryOperator = Java.loadClass("java.util.function.UnaryOperator");
const UtilsJS = Java.loadClass("dev.latvian.mods.kubejs.util.UtilsJS");
const TextColor = Java.loadClass("net.minecraft.network.chat.TextColor");
const Style = Java.loadClass("net.minecraft.network.chat.Style");

function createStyle(color) {
    const StyleClass = Style.EMPTY.class;
    let ctor = StyleClass.getDeclaredConstructors()[0];
    ctor.setAccessible(true);
    return ctor.newInstance(color, null, null, null, null, null, null, null, null, null);
}

function setStyle(rarity, style) {
    let field = rarity.getClass().getDeclaredField("styleModifier");
    field.setAccessible(true);
    field.set(
        rarity,
        UtilsJS.makeFunctionProxy("client", UnaryOperator, ($) => {
            return style;
        })
    );
}

function setColor(rarity, color) {
    setStyle(rarity, Style.EMPTY.applyFormat(color));
}

setColor(Rarity.UNCOMMON, Color.GREEN)
/**
 * Possible stylings:
 * - .withBold(true)
 * - .withItalic(true)
 * - .withStrikethrough(true)
 * - .withUnderlined(true)
 * - .withObfuscated(true)
 */
//setStyle(Rarity.UNCOMMON, Style.EMPTY.applyFormat(Color.GOLD).withObfuscated(true));

// Create custom style
const style = createStyle(TextColor.fromRgb(0xFF0000));