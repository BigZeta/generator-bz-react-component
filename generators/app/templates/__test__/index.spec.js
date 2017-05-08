import React from 'react';
import renderer from 'react-test-renderer';

import <%= answers['component'] %> from '../src/<%= slug %>'

test('just a simple test', () => {

    const component = renderer.create(
        <<%= answers['component'] %>/>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

