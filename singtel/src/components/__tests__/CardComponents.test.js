
import React from 'react';
import {CardComponent} from '../CardComponent';
import { shallow } from 'enzyme';
import { render, fireEvent } from 'react-native-testing-library';

const onClickCallbackMock = jest.fn();

it('should match to snapshot', () => {
    const component = shallow(<CardComponent 
        item = {{
          cardNumber: 10,
          cardRevealed: false,
          disableClick: false,
        }}
        index = {10}
        testID='CardContainer'
        onClickCallback= {onClickCallbackMock}
       />)
    expect(component).toMatchSnapshot()
    expect(component.find({testID: "CardContainer"})).toBeDefined();
    expect(component.find({testID: "AnimatedViewFront"})).toBeDefined();
    expect(component.find({testID: "AnimatedViewBack"})).toBeDefined();
    expect(component.find({testID: "backSideText"})).toBeDefined();
    expect(component.find({testID: "frontSideText"})).toBeDefined();

    
  });

  describe('it must make call to the callback function', ()=>{
    it('make call to the callback', () => {
        const {unmount,getByTestId} = render(<CardComponent 
            item = {{
              cardNumber: 10,
              cardRevealed: false,
              disableClick: false,
            }}
            index = {10}
            testID='CardContainer'
            onClickCallback= {onClickCallbackMock}
           />);
  
           
        fireEvent.press(getByTestId('CardContainer'));
       
        expect(onClickCallbackMock).toHaveBeenCalled();
        unmount();
      });
  });


 