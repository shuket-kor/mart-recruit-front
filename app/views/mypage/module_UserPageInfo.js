<div class="tr-breadcrumb-user-page bg-image section-before">
    <div class="container">
        <div class="breadcrumb-info text-center">
            <div class="user-image">
                <img src='<%=(userInfo.PHOTO) ? `${hostName}/api/files/get/${userInfo.PHOTO}` : `/assets/images/others/author.png` %>' alt="Image" class="img-fluid"></img>
            </div>
            <div class="user-title">
                <h3><%-(userInfo.NAME) ? userInfo.NAME : '' %></h3>
            </div>		
        </div>
    </div>
</div>