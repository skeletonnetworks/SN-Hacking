### SN-Hacking
A resource containing unique hacking minigames made by ProdigyRP  
FULL CREDITS TO: https://prodigyworld.net/
Any problems/suggestions: https://discord.gg/YgmWhMxtPU

## Memory Minigame
```
    local success = exports['SN-Hacking']:MemoryGame(3, 2, 10) --MemoryGame(keysNeeded(number), rounds(number), time(seconds))
    if success then
        print("success")
    else
        print("fail")
    end
```
![image](https://github.com/skeletonnetworks/SN-Hacking/assets/54223504/eb4532ed-d6bc-4f22-a633-ac54ad3ef0e3)

## Number Up Minigame
```
    local success = exports['SN-Hacking']:NumberUp(28, 2, 2, 40, 20) --NumberUp(keys(number), rounds(number), tries(number), time(seconds), shuffleTime(seconds))
    if success then
        print("success")
    else
        print("fail")
    end
```
![image](https://github.com/skeletonnetworks/SN-Hacking/assets/54223504/6a47018d-0602-4cc0-8a10-afa7f7cd90f9)

## Skill Check Minigame

```
    local success = exports['SN-Hacking']:SkillCheck(50, 5000, {'w','a','s','w'}, 2, 20, 3) --SkillCheck(speed(ms), time(ms), keys(string or table), rounds(number), bars(number), safebars(number))
    if success then
        print("success")
    else
        print("fail")
    end
```
![image](https://github.com/skeletonnetworks/SN-Hacking/assets/54223504/dcad4620-5b4e-42bb-8ca0-4e6fd5859721)
