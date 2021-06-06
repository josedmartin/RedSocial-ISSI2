from silence.decorators import endpoint

@endpoint(
    route="/valoration",
    method="GET",
    sql="SELECT * FROM PhotosWithUsersAndValoration"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/valoration/$photoId",
    method="GET",
    sql="SELECT * FROM PhotosWithUsersAndValoration WHERE photoId = $photoId"
)
def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/valoration",
    method="POST",
    sql="INSERT INTO Valoration (value, userId, photoId) VALUES ($value, $userId, $photoId)",
    description="Creates a new photo",
    auth_required=True,
)
def create(value, userId, photoId):
    pass