import {generateRandomPairs, setCardsData, shuffle} from '../utility';


describe('testing utility functions', ()=>{
    it('shuffle - input array will be different than output array', ()=>{
       const arr = [1,2,3,4,5];
       const shuffledArray = shuffle(arr);

       expect(arr).not.toBe(expect.arrayContaining(shuffledArray));
    })

    it('generateRandomPairs will generate the array with the pairs', ()=>{
       const arr = generateRandomPairs(3);
       expect(arr.length).toBe(6);
       expect(arr.filter(i => i === arr[0]).length).toBe(2);
    })

    it('set card data function', ()=>{
        const arr = setCardsData(3);
        expect(arr.length).toBe(6);
    })
})

