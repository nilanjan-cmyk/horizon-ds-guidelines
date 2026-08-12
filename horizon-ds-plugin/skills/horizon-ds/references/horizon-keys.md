# Horizon DS — Component, Variable, and Text-Style Keys

Use these keys with `importComponentByKeyAsync`, `importVariableByKeyAsync`, and `importStyleByKeyAsync`.

## File & library

| | |
|---|---|
| Figma file key | `UfHICFSU9PJl9OkE84mUk9` |
| Figma URL | https://www.figma.com/design/UfHICFSU9PJl9OkE84mUk9 |
| Library key (for `search_design_system` `includeLibraryKeys`) | `lk-47ecb318fd01d6c8c5dd1f4fa00d27ace8c5fb7ca8377928451f63aae7ce10fa4bb7aedd81964f2fc4e35f8d96fe478f45cbe45ed377b6a6493e311b33851b8b` |
| Library display name | `⚙️ Horizon Design System ✨` |

## Component keys

```yaml
# Tables
Table/Cell-set:                 8856a95316517bcd286ebe970ea84523350ac8ac
Table/Cell-Default:             39646742e93acea748f28105bd4045a676ab86a1
Table/Cell-Actions:             3bcabd5c6faa8bd8672ad7435ec3296b0ddea246
Table/Cell-WithCheckbox:        2d90115663652ca0a25483578e8aa75c1219c3b8
Table/Head:                     9505e87fb5fa75a664d917226cc404fa502f3aeb
Table/Footer-Bulk-3:            57b1f66f15271195ed0dad465982d7bcdac03c14
Table/Footer-Pagination:        b7f235d5c22b3e9484811ecb5ceba5161841349f

# Buttons & inputs
BvButton-set:                   c52b5bbbb11a6a8ba11dc5169001e791c2ea1f80
Input-Fields/WPR:               42047d200a60d9bc8c51b03ecd7ad15506d808fe
Input-Fields/MalCare:           1e400f4a5bc1bfad5629f4e08813f0fb78c25a76
Input-Fields/BlogVault:         9d7ee012a19b20251e90de79cf35be412854a6f8
Input-Fields/Airlift:           3bc739a9e4cea0e91277d025224c442606645eca
Clone—Text-Box:                 7dbd50b5ce3d8d35b91c7795b19f898314ca8093
Clone—Radio-Item:               8e0f6847e31c5ceda7852b3fcab24b0b499c71da
Radio-simple-icon:              45d2f82485e4097954709a17b44f57fbe8d32966

# Avatars & pills & badges
Avatar-sm:                      bb92ad11806f35a73ec0100ad0956540ce51b5d1
Pill-Neutral-Small:             050e8f8674ba078cadd0b0adda596c11232d218c
Pill-Success-Small:             892fac88c3f97b90402cedeae9f4c973b39a5e82
Pill-Informative-Small:         a1485504321e8fdb8d7a2daa70abb148b2639f78
Badge-Warning-Small:            fac1eb3fd8244829fff32e65aaca6b7db275c42e

# Notifications
Notification-set:               abe722089ad6e241d4a0b0c06b9ec28e83879d9b

# Icons (Horizon, NOT shadcn)
Icon/UserPlus:                  779f3e4d19116101d8877982ce0da7b57762c55d
Icon/user-plus-lower:           11583cc6146c1a98162d00b8cd3ab9b71d99cd16
Icon/Calendar:                  09ee6bd0a83ab2cfa1d6681e1c0111ca753922ed
Icon/CalendarDays:              d2b30d11d38a5b5c1572743ac0543e13552912f2
Icon/calendar-days-lower:       1ba49aa225d3dbc2023066f027031ba53214853b
Icon/CircleHelp:                04d9ba5a598987ecde84b1110aa264fb9f9a031f
Icon/Pencil:                    1bac2260aa987f86954e112e9f3d650691fedeca
Icon/Trash2:                    9d43bdf2dcc69ed3c22975664f60cb779bb6f97f
Icon/RefreshCw:                 97e764c8dc4e1c910cd9965074c4d2acd7b0e737
```

## Color variable keys (selected)

```yaml
zinc-50:        da6ab4aa6a3f10e22c0f109d1204eeeeb3efde70
zinc-100:       7e9b11d5e37187a10a19173ac5ac20717739b773
zinc-500:       c16429d60aa0729adc4b75040e33f1b4f6eecaed
zinc-700:       0921568620ff6dadb115b61349357c63ac50b88b
zinc-900:       fcf36a1665ecadba1013636de9083936e725a23e
emerald-50:     dd87d866302cadea20ce4a2a51d91830be8ff256
emerald-500:    d0c67ceda2720d1fb6f486c0f909dcd19110a115
sky-50:         97f0044e06fdc670bed5c615964b6651bcae6fdd
red-500:        af2bcbb305504da6dc90d304a36d98a91fd9ec8d
```

## Text style keys (subset — full ramp ≈ 84 styles)

```yaml
type/xs/normal/regular:    35d2f8834abfff7f91932d62f076777bd2a0a27a
type/xs/normal/medium:     bc8fcf7834a54d01bacb3412dc65038140f7ae6c
type/xs/normal/bold:       f2d7b5af701955728011028dd29286c72c7d66b8
type/sm/normal/regular:    d05084c39438b1e6e4697202660a117c0d42dd4f
type/sm/normal/medium:     ab9030859fe0e2cd6f4797c05a8d8b2e625bf104
type/sm/tight/medium:      621605d95e76d1ec7d275530e0a9a392eb6cf59f
type/base/normal/regular:  145200f68e751c10668f8a7098a21eabca61f880
type/base/tight/semibold:  ce9dca96318b12c31b4dbfd8ebba7464d2719657
type/lg/tight/semibold:    2dd797bfec2e0247ed6e48ce6db9a18ab5c77902
type/2xl/tight/semibold:   6be0ef6dcd3b6e7f40562dc6078c50ba0dbd0824
```

## Input Fields/WPR component properties

| Property name | Type | Purpose |
|---|---|---|
| `Text#219:1` | TEXT | Label text |
| `Text 2#219:0` | TEXT | Information / helper text |
| `Label#219:3` | BOOL | Show label |
| `Mandatory#219:4` | BOOL | Show red asterisk |
| `Supporting Text#219:2` | BOOL | Show helper text |
| `Left Icon#219:6` | BOOL | Show left icon |
| `Right Icon#219:5` | BOOL | Show right icon (clear `x` for Input variant) |
