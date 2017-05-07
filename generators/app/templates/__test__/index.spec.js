import React from 'react';
import renderer from 'react-test-renderer';
import { Router, createMemoryHistory } from 'react-router';
import TestUtils from 'react-addons-test-utils';

import {ChartProjectRoot,configureStore} from '@bigzeta/project-editor';
//import '@bigzeta/project-editor/assets/css/project-editor.css';

import chai, {assert} from 'chai'

// Create history object to operate with in non-browser environment
const history = createMemoryHistory('/project/1000');


test('just a simple test', () => {
    let store = configureStore();
    const component = renderer.create(
        <ChartProjectRoot store={store}/>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();


});

describe('test project editor root', function() {
    it('should create a store object', function() {
        let store = configureStore();
        assert.isObject(store, 'store is an object');
    })

    it('should render a chart object', function() {
        let store = configureStore();
        const component = renderer.create(
            <ChartProjectRoot store={store}/>
        );
    })
});