
import React from 'react';
import {GameScreen} from '../GameScreen';
import { shallow } from 'enzyme';
import  * as utils from '../../utils/utility';
import { render, fireEvent } from 'react-native-testing-library';
import { act } from 'react-test-renderer';

it('should match to snapshot', () => {
    const component = shallow(<GameScreen/>)
    expect(component).toMatchSnapshot()
  });


  jest.spyOn(utils, 'setCardsData').mockImplementation(()=> {
    return [{cardNumber: 10, cardRevealed: false},{cardNumber: 10, cardRevealed: false},{cardNumber: 10, cardRevealed: false},{cardNumber: 10, cardRevealed: false}]
  }) 
  describe('Expect flatlist to be present', ()=>{
    it("Render the flatlist", ()=>{
        const {unmount,getByTestId} = render(<GameScreen/>)
        const flatlist = getByTestId('datalist');
        const restart = getByTestId('restart');
        const steps = getByTestId('steps');
        const cards = getByTestId('card0');
        
        fireEvent.press(restart);
        expect(steps.props.children).toBe('Steps : 0')
        
        fireEvent.press(cards);
        expect(steps.props.children).toBe('Steps : 1')
        
        expect(flatlist).toBeDefined();

        
    })
  })