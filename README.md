# pm-carousel
Accessible carousel plugin written in JS with no dependencies


## HTML markup

The HTML order is very important to be fully accessible. Minimal HTML to use `pm-carousel`:

```html
<div data-pm-carousel>
  <button
    type="button"
    data-pm-carousel-playstop="Stop the carousel|Play the carousel"
    hidden
  >{text}</button>

  <ul data-pm-carousel-paging hidden>
    <li>
      <button type="button">Slide {nbr}</button>
    </li>
  </ul>

  <div data-pm-carousel-wrapper>
    <div data-pm-carousel-overflow>
      <div data-pm-carousel-item>
        ...
      </div>
    </div>
  </div>

  <button
    data-pm-carousel-prev="Previous item|Go back to last item"
    type="button"
    hidden
  >{text}</button>
  <button
    data-pm-carousel-next="Next item|Go back to first item"
    type="button"
    hidden
  >{text}</button>
</div>
```

- **Play and Stop button**
  ```html
  <button
    type="button"
    data-pm-carousel-playstop="Stop the carousel|Play the carousel"
    hidden
  >{text}</button>
  ```

- **Paging**

  The HTML inside the button can be freely personalized, but keep **{nbr}**.

  ```html
  <ul data-pm-carousel-paging hidden>
    <li>
      <button type="button">Slide {nbr}</button>
    </li>
  </ul>
  ```

- **The carousel**
  ```html
  <div data-pm-carousel-wrapper>
    <div data-pm-carousel-overflow>
      <div data-pm-carousel-item>
        ...
      </div>
      <div data-pm-carousel-item>
        ...
      </div>
      <div data-pm-carousel-item>
        ...
      </div>
    </div>
  </div>
  ```

- **Previous and next buttons**

  The HTML inside the buttons can be freely personalized, but keep **{nbr}**.

  Labels inside `data-pm-carousel-prev` and `data-pm-carousel-next` attributes are used to dynamize the buttons.

  ```html
  <button
    data-pm-carousel-prev="Previous item|Go back to last item"
    type="button"
    hidden
  >{text}</button>

  <button
    data-pm-carousel-next="Next item|Go back to first item"
    type="button"
    hidden
  >{text}</button>
  ```

## Settings

Default settings:
```js
{
  loop: true,
  group: 1,
  spaceAround: 0,
  noStartSpace: false,
  autoplay: 0,
}
```

## Usage

```sh
npm i pm-carousel --save
```
or
```sh
yarn add pm-carousel
```

Then import `pm-carousel`:

```js
import pmCarousel from "pm-carousel";
```

If you only need to load the script in you page, you can find the `umd` version inside the `dist` folder: `pm-carousel.umd.js`.

### 2 ways to initialize `pm-carousel`:

- For all carousels:

  ```js
  pmCarousel();
  ```

- For specified carousels only:

  ```js
  const myCarousels = document.querySelectorAll(".my-class");

  pmCarousel({}, myCarousels);
  ```

Both methods can be called again when new carousels are injected into the DOM.

### Managing settings

2 solutions:

- When calling `pmCarousel` function gloabaly or for specified carousels indeed:

  ```js
  pmCarousel({
    default: {
      group: 1,
    },
    responsive: [
      {
        minWidth: "800px",
        group: 4,
      },
      {
        minWidth: "400px",
        group: 2,
      },
      {
        minWidth: "600px",
        disable: true,
      },
    ]
  });
  ```

- Inside the `data-pm-carousel` attribute to be even more specific:

  ```html
  <div data-pm-carousel=`{"default": {
      "group": 1,
    },
    "responsive": [
      {
        "minWidth": "800px",
        "group": 4,
      },
      {
        "minWidth": "400px",
        "group": 2,
      },
      {
        "minWidth": "600px",
        "disable": true,
      },
    ]}`>
    ...
  </div>
  ```

### Responsive settings

Have you noticed the `reponsive` key? That makes really easy to make your carousel fully responsive.

You can use whatever unit you want for the `minWidth` setting.

The `disable` setting will deactivate the carousel.
