//0 => null
//1 => floor
//2 => stairs
//3 => springsboard
//p => player
//e => nemesis
//n => nuts
//h => house

function getMap(int){
    if(int == 0){
        return ["00h000000p200000",
                "1011101111211111",
                "00000n0000200000",
                "0011110000222200",
                "0000000000200000",
                "0022222222200n00",
                "0020000000200000",
                "00n0000000200000",
                "0000000000e00000",
                "1110131101111111"
                ]
    }
}