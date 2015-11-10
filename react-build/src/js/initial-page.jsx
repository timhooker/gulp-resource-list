app.showInitialPage = function() {
  var data = [{
    author: "Pete Hunt",
    text: "This is one comment"
  }, {
    author: "Jordan Walker",
    text: "This is another comment"
  }, {
    author: "Tim Hooker",
    text: "React gives everyone a headache"
  }];
  var CommentForm = React.createClass({
    handleSubmit: function(e) {
      e.preventDefault();
      var author = React.findDOMNode(this.refs.author).value.trim();
      var text = React.findDOMNode(this.refs.text).value.trim();
      if (!text || !author) {
        return;
      }
      this.props.onCommentSubmit({author: author, text: text});
      React.findDOMNode(this.refs.author).value = '';
      React.findDOMNode(this.refs.text).value = '';
      return;
    },
    render: function() {
      return (
        <form className = "commentForm" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Your Name" ref="author"/>
          <br/>
          <textarea placeholder="Say Something.. " ref="text"></textarea>
          <br/>
          <input type="submit" value="Post" />
        </form>
      );
    }
  });
  var Comment = React.createClass({
    render: function() {
      return ( <div className = "comment" >
        <h4 className = "commentAuthor"> {this.props.author}</h4> {this.props.children}
        </div>
      );
    }
  });
  var CommentList = React.createClass({
    render: function() {
      var commentNodes = this.props.data.map(function(comment) {
        return (
          <Comment author={comment.author}>
            {comment.text}
          </Comment>
        );
      });
      return (
        <div className = "commentList">
          {commentNodes}
         </div>
      );
    }
  });

  var CommentBox = React.createClass({
    getInitialState: function() {
      return {data:data};
    },
    handleCommentSubmit: function(comment) {
      data = this.state.data;
      data.push(comment);
      this.setState({data:data})
    },
    componentDidMount: function() {
      var self = this;
      app.getData('comments.json', function(data){
        data = JSON.parse(data);
        self.setState({data: data});
      });
    },
    render: function() {
      return ( <div className = "commentBox" >
        <h1>Comments</h1>
        <CommentList data = {this.state.data}
        /><CommentForm onCommentSubmit={this.handleCommentSubmit} />
        </div>
      );
    }
  });

  React.render( <CommentBox data = { data } />,
    document.body
  );
};
