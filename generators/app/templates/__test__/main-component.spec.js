import React from 'react'
import ReactShallowRenderer from 'react-test-renderer/shallow'

import <%= answers['component'] %> from '../src/<%= slug %>'

describe('<%= answers['component'] %>', function() {

    it('should render', function () {
        const renderer = new ReactShallowRenderer()

        renderer.render(<<%= answers['component'] %>/>)

        const result = renderer.getRenderOutput()

        expect(result.type).toBe('div')
        expect(result.props.children).toEqual('Hello World')
  });
});
