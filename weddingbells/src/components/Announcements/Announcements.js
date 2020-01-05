// import dependencies
import React, { Component } from "react";
import { connect } from "react-redux";

import AnnouncementsModal from "./AnnouncementsModal";

import { Button, Table } from "reactstrap";

// import actions
import { deleteAnnouncement, fetchAnnouncements } from "../../actions";

class Announcements extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false,
		};
	}

	// todo: shouldn't have to make creds everything component mounts/updates

	componentDidMount = () => {
		this.props.fetchAnnouncements();
	};

	handlerDeleteAnnouncement = announcementId => {
		this.props.deleteAnnouncement(announcementId);
	};

	toggleModal = e => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	render() {
		return (
			<div className="announcements-wrapper">
				<Button color="primary" onClick={this.toggleModal}>
					Make An Announcement
				</Button>
				<Table className="announcements-list" bordered hover>
					<thead>
						<tr>
							<th>Title</th>
							<th>Announcement</th>
							<th>Timestamp</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{this.props.announcements.map(announcement => (
							<tr className="announcement">
								<td>{announcement.title}</td>
								<td>{announcement.announcement}</td>
								<td>{announcement.time_stamp.split("T")[0]}</td>
								<td>
									<Button
										color="link"
										onClick={() =>
											this.handlerDeleteAnnouncement(announcement.id)
										}
									>
										<img
											alt="delete"
											className="deleteMe"
											src={require("../../assets/delete.svg")}
										/>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
				<AnnouncementsModal
					isOpen={this.state.isOpen}
					toggle={this.toggleModal}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	announcements: state.announcementReducer.announcements,
});

export default connect(mapStateToProps, {
	deleteAnnouncement,
	fetchAnnouncements,
})(Announcements);
