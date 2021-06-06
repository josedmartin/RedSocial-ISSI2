from silence.decorators import endpoint

@endpoint(
    route="/photos",
    method="GET",
    sql="SELECT * FROM PhotosWithUsersAndValoration WHERE visibility = 'Public' ORDER BY date DESC"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/photos/all/$userId",
    method="GET",
    sql="SELECT * FROM PhotosWithUsersAndValoration WHERE visibility = 'Public' OR userId = $userId ORDER BY date DESC"
)
def get_all_by_id():
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="GET",
    sql="SELECT * FROM PhotosWithUsersAndValoration WHERE photoId = $photoId"
)
def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/profile/public/$userId/profile",
    method="GET",
    sql="SELECT * FROM PhotosWithUsersAndValoration WHERE visibility = 'Public' AND userId = $userId ORDER BY date DESC"
)
def get_by_userId():
    pass

###############################################################################

@endpoint(
route="/profile/selfprofile/$userId/profile",
    method="GET",
    sql="SELECT * FROM PhotosWithUsersAndValoration WHERE userId = $userId ORDER BY date DESC"
)
def get_all_by_userId():
    pass

###############################################################################

@endpoint(
    route="/photos",
    method="POST",
    sql="INSERT INTO Photos (title, description, url, visibility, userId) VALUES ($title, $description, $url, $visibility, $userId)",
    description="Creates a new photo",
    auth_required=True,
)
def create(title, description, url, visibility, userId):
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="PUT",
    sql="UPDATE Photos SET title = $title, description = $description, url = $url, visibility = $visibility WHERE photoId = $photoId",
    description="Updates an existing photo",
    auth_required=True,
)
def update(title, description, url, visibility):
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="DELETE",
    sql="DELETE FROM Photos WHERE photoId = $photoId",
    description="Removes a photo",
    auth_required=True,
)
def delete():
    pass
