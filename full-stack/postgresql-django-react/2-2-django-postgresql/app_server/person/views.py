from django.http import HttpResponse

def index(request):
    return HttpResponse("This is a person manager.")
