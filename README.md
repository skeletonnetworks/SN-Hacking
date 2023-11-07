### SN-Hacking
A resource containing unique hacking minigames made by ProdigyRP  
FULL CREDITS TO: https://prodigyworld.net/
Any problems/suggestions: https://discord.gg/YgmWhMxtPU

## Memory Minigame
```
    local success = exports['SN-Hacking']:MemoryGame(3, 2, 10) --MemoryGame(keysNeeded(number), rounds(number), time(milliseconds))
    if success then
        print("success")
    else
        print("fail")
    end
```
![image](https://github.com/skeletonnetworks/SN-Hacking/assets/54223504/eb4532ed-d6bc-4f22-a633-ac54ad3ef0e3)

## Number Up Minigame
```
    local success = exports['SN-Hacking']:NumberUp(28, 2, 2, 40, 20) --NumberUp(keys(number), rounds(number), tries(number), time(milliseconds), shuffleTime(milliseconds))
    if success then
        print("success")
    else
        print("fail")
    end
```
![image](https://github.com/skeletonnetworks/SN-Hacking/assets/54223504/6a47018d-0602-4cc0-8a10-afa7f7cd90f9)

## Skill Check Minigame

```
    local success = exports['SN-Hacking']:SkillCheck(50, 5000, {'w','a','s','w'}, 2, 20, 3) --SkillCheck(speed(milliseconds), time(milliseconds), keys(string or table), rounds(number), bars(number), safebars(number))
    if success then
        print("success")
    else
        print("fail")
    end
```
![image](https://github.com/skeletonnetworks/SN-Hacking/assets/54223504/dcad4620-5b4e-42bb-8ca0-4e6fd5859721)

## Thermite Minigame

```
    local success = exports['SN-Hacking']:Thermite(7, 5, 10000, 2, 2, 3000) --Thermite(boxes(number), correctboxes(number), time(milliseconds), lifes(number), rounds(number), showTime(milliseconds))
    if success then
        print("success")
    else
        print("fail")
    end
```
![image](https://github.com/skeletonnetworks/SN-Hacking/assets/54223504/7c1060da-bad4-4285-bcdc-1a6664fcc3a6)

## Skill Bar Minigame

```
    local success = exports['SN-Hacking']:SkillBar({2000, 3000}, 10, 2) --SkillBar(duration(milliseconds or table{min(milliseconds), max(milliseconds)}), width%(number), rounds(number))
    if success then
        print("success")
    else
        print("fail")
    end
```
![image](https://github.com/skeletonnetworks/SN-Hacking/assets/54223504/9056f766-f708-4dfa-98c8-1e96ac4a4a94)

## Keypad Minigame

```
    exports['SN-Hacking']:ShowNumber(999, 3000) --ShowNumber(code(number), time(milliseconds))
```
![image](https://github.com/skeletonnetworks/SN-Hacking/assets/54223504/7ab6bf59-2bf2-4ffd-920d-2df0dbb55a52)

```
    local success = exports['SN-Hacking']:KeyPad(999, 3000) --KeyPad(code(number), time(milliseconds))
    if success then
        print("success")
    else
        print("fail")
    end
```
![image](https://github.com/skeletonnetworks/SN-Hacking/assets/54223504/46b2a3c1-864f-4960-b37e-bfbd1b3e3bca)