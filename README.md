# Configurable Paint App

A paint app configurable via query parameters.

## Screenshot

<img src="https://github.com/shio-yaamaa/configurable-paint-app/blob/master/docs/screenshot.png">

## Configuration

| Name                | Description                           | Type                  | Default  | Notes                             |
| :------------------ | :------------------------------------ | :-------------------- | :------- | :-------------------------------- |
| `width`             | The width of the canvas.              | number                | `800`    |                                   |
| `height`            | The height of the canvas.             | number                | `600`    |                                   |
| `initial_pen_color` | The initial color of the pen.         | Hex color without `#` | `000000` |                                   |
| `initial_pen_size`  | The initial size of the pen.          | number                | `10`     |                                   |
| `background_color`  | The initial color of the background.  | Hex color without `#` | `ffffff` |                                   |
| `palette_color`     | The color shown in the color palette. | Hex color without `#` | None     | Multiple colors can be specified. |

### Examples

- [`https://shio-yaamaa.github.io/configurable-paint-app/?width=200&height=200`](https://shio-yaamaa.github.io/configurable-paint-app/?width=200&height=200)
  - A 200x200 canvas.
- [`https://shio-yaamaa.github.io/configurable-paint-app/?initial_pen_color=ff0000&background_color=0000ff`](https://shio-yaamaa.github.io/configurable-paint-app/?initial_pen_color=ff0000&background_color=0000ff)
  - Red pen on blue background.
- [`https://shio-yaamaa.github.io/configurable-paint-app/?palette_color=ff0000&palette_color=00ff00&palette_color=0000ff`](https://shio-yaamaa.github.io/configurable-paint-app/?palette_color=ff0000&palette_color=00ff00&palette_color=0000ff)
  - Red, green, and blue in the color palette.

## Scripts

```sh
yarn start
yarn deploy
```
