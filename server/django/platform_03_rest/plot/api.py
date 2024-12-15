from rest_framework import routers, serializers, viewsets

from .models import Plot, Comment

class PlotSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Plot
        fields = ['id', 'title', 'content', 'created_at']

class PlotViewSet(viewsets.ModelViewSet):
    queryset = Plot.objects.all()
    serializer_class = PlotSerializer

class CommentSerializer(serializers.HyperlinkedModelSerializer):
    plot_id = serializers.PrimaryKeyRelatedField(queryset=Plot.objects.all())
    
    class Meta:
        model = Comment
        fields = ['id', 'plot_id', 'text', 'grade']

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer

    def get_queryset(self):
        plot_id = self.request.query_params.get('plot_id')
        if plot_id is not None:
            return Comment.objects.filter(plot_id=plot_id)
        return Comment.objects.all()

router = routers.DefaultRouter()
router.register(r'plot', PlotViewSet, basename='plot')
router.register(r'comment', CommentViewSet, basename='comment')
