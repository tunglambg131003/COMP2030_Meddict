import glob 
from PIL import Image
from resizeimage import resizeimage

async def if_exists_image(id: str):
    '''
    Check if a file exists
    '''
    path = f"images/{id}.*"
    files = glob.glob(path)
    if len(files) == 0:
        return False
    return True

async def download_image(id: str, illustration: str):
    '''
    Download an image from the internet
    '''
    import requests
    import shutil
    url = illustration
    # install image
    try:
        file_name = illustration.split("/")[-1]
        file_extension = file_name.split(".")[-1]
        response = requests.get(url, stream=True)
        with open(f"images/{id}.{file_extension}", "wb") as out_file:
            shutil.copyfileobj(response.raw, out_file)
        del response
    except: 
        return False

    # resize image
    size = (300, 300)
    fd_img = open(f"images/{id}.{file_extension}", "rb")
    img = Image.open(fd_img)
    img = resizeimage.resize_height(img, min(size[0], img.size[1]))
    img.save(f"images/{id}.{file_extension}", img.format)
    fd_img.close()
    return True