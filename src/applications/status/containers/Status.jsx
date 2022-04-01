import React from 'react';
import { connect } from 'react-redux';

import {
  fetchAPIStatus,
  fetchLatestCommits,
  fetchDataDogData,
} from '../actions';

const mapDispatchToProps = {
  fetchAPIStatus,
  fetchLatestCommits,
  fetchDataDogData,
};

export class App extends React.Component {
  componentDidMount() {
    this.props.fetchAPIStatus();
    this.props.fetchLatestCommits('vets-api');
    this.props.fetchLatestCommits('vets-website');
    this.props.fetchLatestCommits('content-build');
    this.props.fetchDataDogData();
  }

  render() {
    const renderCommit = commit => (
      <div className="commit" key={commit.sha}>
        <div className="message">{commit.commit.message}</div>
        <div className="author">
          <img
            className="avatar"
            src={commit.author.avatar_url}
            alt="Author Avatar"
          />
          <div className="author-details">
            <span className="name">{commit.commit.author.name}</span>
            <span className="date">
              {new Date(commit.commit.author.date).toLocaleDateString()}
            </span>
          </div>
          <a
            className="commit-link"
            target="_blank"
            href={commit.html_url}
            rel="noreferrer"
          >
            View Commit
          </a>
        </div>
      </div>
    );
    return (
      <main className="status">
        <div className="container">
          <div className="row">
            <div
              className="columns medium-12 vads-u-padding-y--8"
              role="region"
              aria-label="VA.gov Platform Status"
            >
              <div>
                <button
                  type="button"
                  className="va-btn-sidebarnav-trigger"
                  aria-controls="va-detailpage-sidebar"
                >
                  <span>
                    <b>More in this section</b>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="444.819"
                      height="444.819"
                      viewBox="0 0 444.819 444.819"
                    >
                      <path
                        fill="#ffffff"
                        d="M352.025 196.712L165.885 10.848C159.028 3.615 150.468 0 140.185 0s-18.84 3.62-25.696 10.848l-21.7 21.416c-7.045 7.043-10.567 15.604-10.567 25.692 0 9.897 3.52 18.56 10.566 25.98L231.544 222.41 92.785 361.168c-7.04 7.043-10.563 15.604-10.563 25.693 0 9.9 3.52 18.566 10.564 25.98l21.7 21.417c7.043 7.043 15.612 10.564 25.697 10.564 10.09 0 18.656-3.52 25.697-10.564L352.025 248.39c7.046-7.423 10.57-16.084 10.57-25.98.002-10.09-3.524-18.655-10.57-25.698z"
                      />
                    </svg>
                  </span>
                </button>
              </div>
              <div className="vads-l-grid-container large-screen:vads-u-padding-x--0 vads-u-padding-y--2">
                <div className="vads-l-row vads-u-margin-x--neg2p5">
                  <div className="vads-l-col--12 vads-u-padding-x--2p5 medium-screen:vads-l-col--4 large-screen:vads-l-col--3">
                    <nav
                      className="va-sidebarnav vads-u-width--full"
                      id="va-detailpage-sidebar"
                    >
                      <div>
                        <button
                          type="button"
                          aria-label="Close this menu"
                          className="va-btn-close-icon va-sidebarnav-close"
                        />
                        <div className="left-side-nav-title">
                          <h4>VA.gov Platform dashboard</h4>
                        </div>

                        <ul className="usa-sidenav-list">
                          <li>
                            <a href="#metrics">Metrics</a>
                          </li>
                          <li>
                            <a href="#changes">Recent Changes</a>
                          </li>
                        </ul>
                      </div>
                    </nav>
                  </div>
                  <div className="vads-l-col--12 vads-u-padding-x--2p5 medium-screen:vads-l-col--8 large-screen:vads-l-col--9">
                    <div>
                      <h1
                        id="metrics"
                        className="section-header section-header--top"
                      >
                        Metrics
                      </h1>

                      <va-accordion>
                        {this.props.DataDogData &&
                        this.props.DataDogData.dataDogData
                          ? this.props.DataDogData.dataDogData.map(
                              (service, key) => (
                                <va-accordion-item
                                  header={service.title}
                                  key={key}
                                >
                                  <div className="accordion-container">
                                    <div>
                                      <iframe
                                        src={`https://app.datadoghq.com/graph/embed?token=${
                                          service.locationsGraphToken
                                        }&height=300&width=600&legend=true`}
                                        width="600"
                                        height="300"
                                        frameBorder="0"
                                        title={`${service.title} Locations`}
                                      />
                                    </div>
                                    <div>
                                      <iframe
                                        src={`https://app.datadoghq.com/graph/embed?token=${
                                          service.timingsGraphToken
                                        }&height=300&width=600&legend=true`}
                                        width="600"
                                        height="300"
                                        frameBorder="0"
                                        title={`${service.title} Timings`}
                                      />
                                    </div>
                                  </div>
                                </va-accordion-item>
                              ),
                            )
                          : null}
                      </va-accordion>
                    </div>
                    <div>
                      <h1 id="changes" className="section-header">
                        Recent Changes
                      </h1>
                      <va-accordion>
                        <va-accordion-item header="vets-website">
                          <div className="commit-container">
                            {this.props.LatestCommits &&
                            this.props.LatestCommits['vets-website']
                              ? Object.keys(
                                  this.props.LatestCommits['vets-website'],
                                ).map(key => {
                                  const commit = this.props.LatestCommits[
                                    'vets-website'
                                  ][key];
                                  return renderCommit(commit);
                                })
                              : null}
                          </div>
                        </va-accordion-item>
                        <va-accordion-item header="vets-api">
                          <div className="commit-container">
                            {this.props.LatestCommits &&
                            this.props.LatestCommits['vets-api']
                              ? Object.keys(
                                  this.props.LatestCommits['vets-api'],
                                ).map(key => {
                                  const commit = this.props.LatestCommits[
                                    'vets-api'
                                  ][key];
                                  return renderCommit(commit);
                                })
                              : null}
                          </div>
                        </va-accordion-item>
                        <va-accordion-item header="content-build">
                          <div className="commit-container">
                            {this.props.LatestCommits &&
                            this.props.LatestCommits['content-build']
                              ? Object.keys(
                                  this.props.LatestCommits['content-build'],
                                ).map(key => {
                                  const commit = this.props.LatestCommits[
                                    'content-build'
                                  ][key];
                                  return renderCommit(commit);
                                })
                              : null}
                          </div>
                        </va-accordion-item>
                      </va-accordion>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
