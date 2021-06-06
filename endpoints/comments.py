from silence.decorators import endpoint

@endpoint(
    route="/comments",
    method="GET",
    sql="SELECT * FROM CommentsWithUsers"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/comments/$photoId/comments",
    method="GET",
    sql="SELECT * FROM CommentsWithUsers WHERE photoId = $photoId"
)
def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/comments",
    method="POST",
    sql="INSERT INTO Comments (commentText, userId, photoId) VALUES ($commentText, $userId, $photoId)",
    description="Creates a new comment",
    auth_required=True,
)
def create(commentText, userId, photoId):
    pass

############################################################################