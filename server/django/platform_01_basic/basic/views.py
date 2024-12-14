from django.http import HttpResponse

def index(request):
    return HttpResponse("The dinosaur jumped into the mud.")