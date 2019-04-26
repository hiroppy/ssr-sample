import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

window.alert = (msg) => {};
process.env.NODE_ENV = 'test';
