### Root

The `Root` component is a key part of your chat application, providing essential context and styling.

#### Component Props

The `Root` component accepts several props that you can utilize to customize its behavior and appearance:

| Prop                           | Type                          | Description                                                           |
| ------------------------------ | ----------------------------- | --------------------------------------------------------------------- |
| `UnauthenticatedViewComponent` | `React.ComponentType`         | Optional. A component to display when a user is not authenticated.    |
| `baseChatColor`                | `string` \| `CustomChatColor` | Optional. A base color or custom color object for chat UI (Only hex). |
| `options`                      | `ChatOptions`                 | Optional. Chat options.                                               |

#### Example Usage

Here's a basic example of how to use the `Root` component in your application:

```javascript
import React from 'react';
import Chat from '@polyfire-ai/chat-ui';
import MyChatComponent from './MyChatComponent';
import CustomLoginComponent from './CustomLoginComponent';

const App = () => {
  return (
    <Chat.Root
      UnauthenticatedViewComponent={CustomLoginComponent}
      baseChatColor="#ff4500"
      options={{ /* your chat options here */ }}
    >
      <MyChatComponent />
    </Root>
  );
};

export default App;
```

#### Styling

`baseChatColor`: This property allows for two types of color customization for your chat interface.

- If you provide a single hexadecimal color code as a string, the system will automatically generate a set of color variations based on this color, applying these across the entire chat interface.
- Alternatively, you have the option to specify detailed color schemes for your chat UI elements, you have the option to pass an object as `CustomChatColor`. This approach allows for precise control over the color variations used throughout the chat interface.

The `CustomChatColor` object uses keys ranging from 50 to 950 to define specific color values. In this scale:

- Lower numbers (like 50, 100, 200) represent lighter shades of the color.
- Higher numbers (such as 700, 800, 900, 950) correspond to darker shades.
- The middle range (around 500) is typically aligned with the initial or base color you choose.

This gradient scale gives you the flexibility to create a harmonious color theme that can adapt to different UI components, enhancing the user interface's visual appeal and usability.

- **Example of Defining Color Variations:**
  ```javascript
  const chatColor = {
    50: '#ffe5e5',   // Lightest shade
    ...
    500: '#ff0000',   // Base color
    ...
    950: '#1a0000'    // Darkest shade
  };
  ```

#### Authentication Handling

- `UnauthenticatedViewComponent`: Use this prop to provide a custom component to be rendered when the user is not authenticated. This component can include login forms or information about authentication.

#### Child Components

- `children`: This is where you place your chat UI components. The `Root` component will render these children within its context.

#### Options

- `options`: Provide chat-related options here. These are used to configure the behavior of your chat UI.
