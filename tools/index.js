const arg = process.argv[2];

const font_path = `../assets/minecraft/font/default.json`
const added_flags_path = `./added_flags.json`

const fs = require('fs');

let added_flags = JSON.parse(fs.readFileSync(added_flags_path, 'utf8'));
var flags = JSON.parse(fs.readFileSync(font_path, 'utf8'));

let providers = flags.providers;

let lastest_flag_id = 0x08FF;

for (let flag of providers) {
    flag_id = flag.chars[0].charCodeAt(0)
    if (flag_id > lastest_flag_id) {
        lastest_flag_id = flag_id
    }
}

lastest_flag_id += 1;
symbol = String.fromCharCode(lastest_flag_id)

providers.push({
    "type": "bitmap",
    "file": `minecraft:font/${arg}.png`,
    "ascent": 8,
    "height": 9,
    "chars": [
        String.fromCharCode(lastest_flag_id)
    ]
})

added_flags.push({"name": arg, "symbol": symbol})

fs.writeFileSync(font_path, JSON.stringify(flags))
fs.writeFileSync(added_flags_path, JSON.stringify(added_flags))