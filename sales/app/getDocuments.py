# newer file 3-20-23
from django.http import HttpResponse
from .models import Document

# a view that retrieves the uploaded documents from db and returns as a zip file
def get_documents(request):
    documents = Document.objects.all()
    # httpResponse creates it
    response = HttpResponse(content_type='application/zip')
    response['Content-Disposition'] = 'attachment; filename="documents.zip"'
    
    # creates zipfile
    # should have a zipfile module (need to check for)
    with zipfile.ZipFile(response, mode='w') as zip_file:
        for document in documents:
            zip_file.write(document.file.path, document.title)
    return response
