from rest_framework import routers, serializers, viewsets

from .models import Plot

class PlotSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Plot
        fields = ['title', 'content', 'created_at']

class PlotViewSet(viewsets.ModelViewSet):
    queryset = Plot.objects.all()
    serializer_class = PlotSerializer

router = routers.DefaultRouter()
router.register(r'plots', PlotViewSet)
