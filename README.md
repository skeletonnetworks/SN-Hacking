### SN-Hacking
A resource containing unique hacking minigames made by ProdigyRP

## Memory Minigame
```
    local success = exports['SN-Hacking']:MemoryGame(3, 2, 10) --MemoryGame(keysNeeded(number), rounds(number), time(seconds))
    if success then
        print("success")
    else
        print("fail")
    end
```
## NumberUp Minigame
```
    local success = exports['SN-Hacking']:NumberUp(28, 2, 2, 40, 20) --NumberUp(keys(number), rounds(number), tries(number), time(seconds), shuffleTime(seconds))
    if success then
        print("success")
    else
        print("fail")
    end
```
## SkillCheck Minigame

```
    local success = exports['SN-Hacking']:SkillCheck(50, 5000, {'w','a','s','w'}, 2, 20, 3) --SkillCheck(speed(ms), time(ms), keys(string or table), rounds(number), bars(number), safebars(number))
    if success then
        print("success")
    else
        print("fail")
    end
```
