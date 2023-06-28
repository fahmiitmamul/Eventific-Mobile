import {View, Text} from 'react-native';
import React from 'react';
import {Drawer} from 'react-native-paper';

const Home = ({navigation}) => {
  const [active, setActive] = React.useState(false);
  return (
    <Drawer.Section title="Some title">
      <Drawer.Item
        label="First Item"
        active={active === 'first'}
        onPress={() => setActive('first')}
      />
      <Drawer.Item
        label="Second Item"
        active={active === 'second'}
        onPress={() => setActive('second')}
      />
    </Drawer.Section>
  );
};

export default Home;
