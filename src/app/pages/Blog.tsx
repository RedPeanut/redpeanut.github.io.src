import React from "react"
import { connect } from "react-redux"

import { MainLayout } from "../components/Layout"
import PostListItem from "../components/PostListItem"
import _ from 'lodash'

class Blog extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    if(process.env.NODE_ENV === 'development') console.log('this.props = ', this.props);
    const pages = this.props.pages ? this.props.pages : this.props.route.pages;
    const path = this.props.route.path === '' || this.props.route.path === '/' ? 'blog' : this.props.route.path;
    const sortedPages = _.sortBy(pages, 'data.insert').reverse();
    // console.log('this.props.route.path = ', this.props.route.path);
    const visiblePages = sortedPages.filter(page => (
      _.get(page, 'file.firstname') === path // blog or gallery
      && _.get(page, 'file.ext') === 'md'
      && !_.includes(page.path, '/404')
    ));
    // console.log('sortedPages = ', sortedPages);
    // console.log('visiblePages = ', visiblePages);

    return (
      // <MainLayout index={1}>
      <div className="blog list">
        <div className="wrap">
          <div className="left category list"></div>
          <div className="post">
            <ul>
              {
                visiblePages.map((page, index) => {
                  return (
                    <PostListItem
                      key={index}
                      page={page}
                    />
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    // </MainLayout>
    )
  }
}

const mapStateToProps = (state) => {return {}}
const mapDispatchToProps = (dispatch) => {return {}}
export default connect(mapStateToProps, mapDispatchToProps)(Blog);
