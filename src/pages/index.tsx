/** @jsxRuntime classic */
/** @jsx jsx */
/* eslint-disable react/display-name */
import React, { Fragment } from 'react';
import { jsx, css, withTheme } from '@emotion/react';
import Head from 'next/head';
import ranks from 'src/data/ranks.json';

import Container from 'src/components/Grid/Container';
import Row from 'src/components/Grid/Row';
import Column from 'src/components/Grid/Column';
import Table, { TableProps } from 'src/components/Table/Table';
import Button from 'src/components/Button/Button';
import Input from 'src/components/Input/Input';

import isString from 'lodash/isString';
import { Theme } from 'src/styles/theme';

type Data = {
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
  theme: Theme;
};

type State = {
  currentPage: number;
  isSearching: boolean;
  searchValue: string;
  data: Array<Data>;
};

class Home extends React.Component<Props, State> {
  data = ranks as Array<Data>;
  perPage = 25;
  totalPage = Math.ceil(this.data.length / this.perPage);

  state: State = {
    currentPage: 1,
    isSearching: false,
    searchValue: '',
    data: this.data,
  };

  handlePageChange = (pageNum: number) => {
    this.setState({
      currentPage: pageNum,
    });
  };

  handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  handleSearch = () => {
    const result = this.data.filter(o => o.id.includes(this.state.searchValue));
    this.setState({
      data: result,
      currentPage: 1,
    });
  };

  handleReset = () => {
    this.setState({
      searchValue: '',
      data: this.data,
      currentPage: 1,
    });
  };

  render() {
    const styles = createStyles(this.props.theme);
    const paginatedData = this.state.data.slice(
      (this.state.currentPage - 1) * this.perPage,
      this.state.currentPage * this.perPage,
    );

    const columns: TableProps<Data>['columns'] = [
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
        render: (value, record) => {
          if (isString(value)) {
            const srcMatch = value.match(/src="([^"]*)/);
            let src: string | undefined;
            if (srcMatch && srcMatch.length > 0) {
              src = srcMatch[1];
            }
            return (
              <img
                src={src}
                width={48}
                height={48}
                alt={`SolPunk ${record.id.replace(/<[^>]+>/g, '')}`}
                css={styles.img}
              />
            );
          }
          return <span>No Image</span>;
        },
      },
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 80,
        render: value => {
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
          return <span>No Image</span>;
        },
      },
      {
        title: 'Min. Score',
        dataIndex: 'minscore',
        key: 'minscore',
        width: 120,
      },
      {
        title: '2nd',
        dataIndex: '2nd',
        key: '2nd',
        width: 80,
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
        render: value => {
          if (isString(value)) {
            return value.split(',').join(', ');
          }
          return null;
        },
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
    const scrollX = columns.reduce((a, b) => {
      return a + Number(b.width);
    }, 0);

    return (
      <Fragment>
        <Head>
          <title>SolPunks Rank</title>
          <meta name="description" content="SolPunks rank checker" />
          <link rel="icon" href="/cropped-unknown_2.png" />
        </Head>

        <div css={styles.wrapper}>
          <Container>
            <div css={styles.heading}>
              <h2>SolPunks Rank</h2>
            </div>

            <Row>
              <Column col={[12, 12, 12, 6]}>
                <form css={styles.searchBox} onSubmit={this.handleFormSubmit}>
                  <Input
                    css={styles.searchBoxInput}
                    placeholder="SolPunk ID"
                    onChange={this.handleInputChange}
                    value={this.state.searchValue}
                  />
                  <Button css={styles.btnSearch} onClick={this.handleSearch} type="submit">
                    Search
                  </Button>
                  <Button
                    css={styles.btnSearch}
                    variant="secondary"
                    onClick={this.handleReset}
                    disabled={this.state.searchValue === ''}
                  >
                    Reset
                  </Button>
                </form>
              </Column>
            </Row>

            <Table<Data>
              columns={columns}
              data={paginatedData}
              scroll={{ x: scrollX }}
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
        </div>
      </Fragment>
    );
  }
}

const createStyles = (t: Theme) => {
  return {
    wrapper: css`
      padding-top: ${t.spacing.xxxxl}px;
      padding-bottom: ${t.spacing.xxxxl}px;
    `,
    heading: css`
      margin-bottom: ${t.spacing.m}px;
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
  };
};

export default withTheme(Home);
