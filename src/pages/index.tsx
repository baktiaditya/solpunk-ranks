/** @jsxRuntime classic */
/** @jsx jsx */
/* eslint-disable react/display-name */
import React, { Fragment } from 'react';
import { jsx, css, withTheme } from '@emotion/react';
import ranks from 'src/data/ranks.json';

import Container from 'src/components/Grid/Container';
import Row from 'src/components/Grid/Row';
import Column from 'src/components/Grid/Column';
import Table, { TableProps } from 'src/components/Table/Table';
import Button from 'src/components/Button/Button';
import Input from 'src/components/Input/Input';
import PreloadImage from 'src/components/PreloadImage/PreloadImage';
import GithubCornerRight from 'src/components/GithubCornerRight/GithubCornerRight';

import isString from 'lodash/isString';
import { rgba } from 'polished';
import { ThemeLib } from 'src/styles/theme';

type PunkData = {
  ranking: number;
  punk_image: string;
  id: string;
  minscore: number;
  '2nd': number;
  category_score: number;
  att_count_score: number;
  attributes: string;
  skin: string;
  type: string;
  total_score: number;
};

type Props = {
  theme: ThemeLib;
};

type State = {
  currentPage: number;
  inputValue: string;
  searchValue: string;
  data: Array<PunkData>;
};

class Home extends React.Component<Props, State> {
  data: Array<PunkData>;
  perPage: number;
  totalPage: number;
  styles: ReturnType<typeof createStyles>;

  constructor(props: Props) {
    super(props);

    this.data = ranks as Array<PunkData>;
    this.perPage = 25;
    this.totalPage = Math.ceil(this.data.length / this.perPage);
    this.styles = createStyles(props.theme);

    this.state = {
      currentPage: 1,
      inputValue: '',
      searchValue: '',
      data: this.data,
    };
  }

  handlePageChange = (pageNum: number) => {
    this.setState({
      currentPage: pageNum,
    });
  };

  handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (this.state.inputValue === '') {
      this.handleReset();
    }
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: e.target.value.trim(),
    });
  };

  handleInputWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target && 'blur' in target) {
      target.blur();
    }
  };

  handleSearch = () => {
    if (this.state.inputValue) {
      const result = this.data.filter(punk => punk.id.includes(this.state.inputValue));
      this.setState({
        data: result,
        currentPage: 1,
        searchValue: this.state.inputValue,
      });
    }
  };

  handleReset = () => {
    this.setState({
      inputValue: '',
      searchValue: '',
      data: this.data,
      currentPage: 1,
    });
  };

  getColumns = () => {
    const columns: TableProps<PunkData>['columns'] = [
      {
        title: 'Ranking',
        dataIndex: 'ranking',
        key: 'ranking',
        width: 80,
      },
      {
        title: 'Image',
        dataIndex: 'punk_image',
        key: 'punk_image',
        width: 72,
        render: this.renderPunkImageCol,
      },
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 80,
        render: this.renderIdCol,
      },
      {
        title: 'Min. Score',
        dataIndex: 'minscore',
        key: 'minscore',
        width: 120,
        render: this.renderCol,
      },
      {
        title: '2nd',
        dataIndex: '2nd',
        key: '2nd',
        width: 80,
        render: this.renderCol,
      },
      {
        title: 'Category Score',
        dataIndex: 'category_score',
        key: 'category_score',
        width: 130,
      },
      {
        title: 'Att. Count Score',
        dataIndex: 'att_count_score',
        key: 'att_count_score',
        width: 130,
      },
      {
        title: 'Attributes',
        dataIndex: 'attributes',
        key: 'attributes',
        width: 300,
        render: this.renderAttrCol,
      },
      {
        title: 'Skin',
        dataIndex: 'skin',
        key: 'skin',
        width: 80,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        width: 80,
      },
      {
        title: 'Total Score',
        dataIndex: 'total_score',
        key: 'total_score',
        width: 200,
      },
    ];

    return columns;
  };

  getScrollX = () => {
    return this.getColumns().reduce((a, b) => {
      return a + Number(b.width);
    }, 0);
  };

  getPaginatedData = () => {
    return this.state.data.slice(
      (this.state.currentPage - 1) * this.perPage,
      this.state.currentPage * this.perPage,
    );
  };

  renderPunkImageCol = (value: React.ReactNode, record: PunkData) => {
    if (isString(value)) {
      const srcMatch = value.match(/src="([^"]*)/);
      let src: string | undefined;
      if (srcMatch && srcMatch.length > 0) {
        src = srcMatch[1];
      }
      const id = record.id.replace(/<[^>]+>/g, '');

      return (
        <PreloadImage
          key={id}
          css={this.styles.img}
          src={src}
          width={48}
          height={48}
          alt={`SolPunk ${id}`}
        />
      );
    }
    return null;
  };

  renderIdCol = (value: React.ReactNode) => {
    if (isString(value)) {
      const hrefMatch = value.match(/href="([^"]*)/);
      let href = '#';
      if (hrefMatch && hrefMatch.length > 0) {
        href = hrefMatch[1];
      }
      return (
        <a href={href} target="_blank" rel="noreferrer">
          {value.replace(/<[^>]+>/g, '')}
        </a>
      );
    }
    return null;
  };

  renderAttrCol = (value: React.ReactNode) => {
    if (isString(value)) {
      if (value === 'NULL') {
        return '-';
      } else {
        return value.split(',').join(', ');
      }
    }
    return value;
  };

  renderCol = (value: React.ReactNode) => {
    if (isString(value) && value === 'NULL') {
      return '-';
    }
    return value;
  };

  render() {
    return (
      <Fragment>
        <a
          css={this.styles.ghCorner}
          href="https://github.com/baktiaditya/solpunk-ranks"
          target="_blank"
          rel="noreferrer"
        >
          <GithubCornerRight css={this.styles.ghCornerSvg} />
        </a>

        <main css={this.styles.main}>
          <Container css={this.styles.container}>
            <div css={this.styles.headingContainer}>
              <h1 css={this.styles.heading}>
                <img src="/logo.svg" alt="Solpunk Ranks" />
              </h1>
            </div>

            <Row>
              <Column col={[12, 12, 12, 6]}>
                <form css={this.styles.searchBox} onSubmit={this.handleFormSubmit}>
                  <Input
                    placeholder="SolPunk ID"
                    type="number"
                    onChange={this.handleInputChange}
                    value={this.state.inputValue}
                    css={this.styles.searchBoxInput}
                    inputCSS={this.styles.searchBoxInputInner}
                    min={0}
                    step={1}
                    onWheel={this.handleInputWheel}
                  />
                  <Button css={this.styles.btnSearch} onClick={this.handleSearch} type="submit">
                    Search
                  </Button>
                  <Button
                    css={this.styles.btnSearch}
                    variant="secondary"
                    onClick={this.handleReset}
                    disabled={this.state.searchValue === ''}
                  >
                    Reset
                  </Button>
                </form>
              </Column>
            </Row>

            <Table<PunkData>
              columns={this.getColumns()}
              data={this.getPaginatedData()}
              scroll={{ x: this.getScrollX() }}
              pagination={{
                onPageChange: this.handlePageChange,
                currentPage: this.state.currentPage,
                perPage: this.perPage,
                totalData: this.state.data.length,
              }}
              footerTextSingular="Showing #text3 SolPunk"
              footerTextPlural="Showing #text1-#text2 from #text3 SolPunks"
            />
          </Container>

          <footer css={this.styles.footer}>
            SolPunks is in no way affiliated with Larva Labs and/or CryptoPunks
          </footer>
        </main>
      </Fragment>
    );
  }
}

const createStyles = (t: ThemeLib) => {
  return {
    ghCorner: css`
      display: block;
      position: absolute;
      right: 0;
      top: 0;

      ${t.mq({
        width: [50, 54, 66],
      })}
    `,
    ghCornerSvg: css`
      width: 100%;
      height: auto;
    `,
    main: css`
      display: flex;
      flex-direction: column;
      padding-top: ${t.spacing.xxxxl}px;
      min-height: 100vh;
    `,
    container: css`
      margin-bottom: ${t.spacing.xxl}px;
    `,
    headingContainer: css`
      margin-bottom: ${t.spacing.ml}px;
    `,
    heading: css`
      font-size: 0;
      line-height: 0;
      margin-bottom: 0;

      img {
        ${t.mq({
          height: [20, 24, 28],
        })}
        width: auto;
      }
    `,
    searchBox: css`
      margin-top: ${t.spacing.m}px;
      margin-bottom: ${t.spacing.m}px;
      display: flex;
      align-items: stretch;
    `,
    searchBoxInput: css`
      flex: 1;
    `,
    searchBoxInputInner: css`
      /* Chrome, Safari, Edge, Opera */
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      /* Firefox */
      -moz-appearance: textfield;
    `,
    btnSearch: css`
      margin-left: ${t.spacing.s}px;
    `,
    img: css`
      image-rendering: -moz-crisp-edges;
      image-rendering: pixelated;
      background: rgb(47, 207, 183);
      background: linear-gradient(
        180deg,
        rgba(47, 207, 183, 1) 0%,
        rgba(111, 143, 209, 1) 50%,
        rgba(179, 73, 238, 1) 100%
      );
    `,
    footer: css`
      margin-top: auto;
      text-align: center;
      background-color: ${rgba(t.color.lightPrimary, t.opacity.clear)};
      padding: ${t.spacing.s}px 0;

      ${t.mq({
        fontSize: [t.typography.size.tiny, t.typography.size.tiny, t.typography.size.small],
      })}
    `,
  };
};

export default withTheme(Home);
