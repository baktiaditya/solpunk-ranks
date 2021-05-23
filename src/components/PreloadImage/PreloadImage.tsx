/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css, withTheme } from '@emotion/react';
import { Theme } from 'src/styles/theme';
import omit from 'lodash/omit';

type PreloadImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  duration?: number;
  ease?: string;
  lazy?: boolean;
  theme: Theme;
  useIntersectionObserver?: boolean;
};

type State = {
  loaded: boolean;
  src: null | string;
};

class PreloadImage extends React.Component<PreloadImageProps, State> {
  static defaultProps: Pick<PreloadImageProps, 'lazy' | 'useIntersectionObserver'> = {
    lazy: true,
    useIntersectionObserver: false,
  };

  state: State = {
    loaded: false,
    src: null,
  };

  ref = React.createRef<HTMLDivElement>();
  observer: null | IntersectionObserver = null;
  preloader: null | HTMLImageElement = null;

  componentDidMount() {
    if (this.props.lazy && this.props.useIntersectionObserver && 'IntersectionObserver' in window) {
      this.setObserver();
    } else {
      this.setPreloader();
    }
  }

  componentWillUnmount() {
    if (this.observer) this.observer.disconnect();
    if (this.preloader) this.preloader.onload = null;
  }

  setObserver() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.setPreloader();
          this.observer && this.observer.disconnect();
        }
      });
    });

    if (this.ref.current) {
      this.observer.observe(this.ref.current);
    }
  }

  setPreloader() {
    this.preloader = new Image();

    this.preloader.onload = () => {
      if (this.props.src) {
        this.setState({
          loaded: true,
          src: this.props.src,
        });
      }
    };

    if (this.props.src) {
      this.preloader.src = this.props.src;
    }
  }

  render() {
    const omittedProps: Array<keyof Pick<PreloadImageProps, 'lazy' | 'useIntersectionObserver'>> = [
      'lazy',
      'useIntersectionObserver',
    ];
    const { width, height, duration, ease, theme, ...rest } = omit(this.props, omittedProps);

    return (
      <div
        ref={this.ref}
        css={css`
          position: relative;
          width: ${width}px;
          height: ${height}px;
        `}
      >
        <img
          {...rest}
          width={width}
          height={height}
          css={[
            css`
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              transition: opacity ${duration || theme.animation.timing.fast}ms
                ${ease || theme.animation.easing.fast};
              opacity: ${this.state.loaded ? 1 : 0};
            `,
          ]}
        />
      </div>
    );
  }
}

export default withTheme(PreloadImage);
