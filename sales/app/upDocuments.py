from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

# may need to move Document into models.py
from .models import Document 


# an upload_document view 
# accepts POST request 
@csrf_exempt
def upload_document(request):
    if request.method == 'Post':
        
        # gets the title of file
        title = request.POST.get('title')
        description = request.POST.get('description')
        
        #gets the actual file
        file = request.FILES.get('file')
        
        # creates new document with data and saves to database
        document = Document(title=title, description = description, file=file)
        document.save()
        return JsonResponse({'status':'ok'})
    return render(request, 'upload.html')
