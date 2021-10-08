import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="Ubuntu"
  values={[
    {label: 'Ubuntu', value: 'Ubuntu'},
    {label: 'MacOS', value: 'MacOS'},
  ]}>
  <TabItem value="Ubuntu">

```
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -

sudo apt install -y nodejs
```

  </TabItem>
  <TabItem value="MacOS">

```
# You can use homebrew (https://docs.brew.sh/Installation)
brew install node

# Or you can use nvm (https://github.com/nvm-sh/nvm)
nvm install node
```

  </TabItem>
</Tabs>
