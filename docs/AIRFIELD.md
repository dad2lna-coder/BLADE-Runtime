# Airfield payload vs Airport Builder

Airport Builder is not required to run BLADE. It writes distribution/config/airfield.json. Everyone else reads that file.

People roles: TSO, LTSO, STSO, ESTI, MSTI, TSM, OTHER.
Seats: TDC, Divest, Body Scanner, CT, KCM, Exit with scope lane|mod|site.

Alpha today nests terminals.checkpoints.modSets with numeric ids. v2 flattens checkpoints and makes modsets positional. Migration required for airport/airfield.json.
Exit-lane cross-sheet tie is optional and unused in Alpha — omit unless a real checkpoint needs it.
AIT is explicit on the modset. Never infer from lane count.
