// @ts-ignore Stories2SnapsConverter is not found
import initStoryshots, { Stories2SnapsConverter } from '@storybook/addon-storyshots';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

initStoryshots({
  test: ({ story, context }) => {
    const converter = new Stories2SnapsConverter();
    const snapshotFilename = converter.getSnapshotFileName(context);
    const storyElement = story.render();

    // @ts-ignore
    const tree = mount(storyElement);

    if (snapshotFilename) {
      // @ts-ignore
      expect(toJson(tree.update())).toMatchSpecificSnapshot(snapshotFilename);
    }
  }
});
