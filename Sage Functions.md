For 2-d plots, add `aspect_ratio=1` to get a 1:1 aspect ratio.
## Parametric Plot
```python
t = var('t')
sage: parametric_plot([cos(t) + 3 * cos(t/9), sin(t) - 3 * sin(t/9)], (t, 0, 18*pi), fill = True, aspect_ratio=1)
```
The function will also create a 3d plot if three components are given.

## Polar Plot
```python
polar_plot(2 + 2*cos(x), (x, 0, 2*pi), color=hue(0.5), thickness=4)
```

## Contour Plot
```python
f(x,y)=y^2+1-x^3-x
sage: contour_plot(f, (x,-pi,pi), (y,-pi,pi))
```

## Vector Fields
```python
plot_vector_field((-y+x,y*x),(x,-3,3),(y,-3,3))
plot_vector_field3d((-y,-z,x), (x,-3,3),(y,-3,3),(z,-3,3)) #3d vector field
```

## Complex Plots[](https://doc.sagemath.org/html/en/prep/Advanced-2DPlotting.html#complex-plots "Permalink to this headline")

We can plot functions of complex variables, where the magnitude is indicated by the brightness (black is zero magnitude) and the argument is indicated by the hue (red is a positive real number).
```python
f(z) = exp(z) #z^5 + z - 1 + 1/z
complex_plot(f, (-5,5),(-5,5))
```

### Region plots[](https://doc.sagemath.org/html/en/prep/Advanced-2DPlotting.html#region-plots "Permalink to this headline")

These plot where an expression is true, and are useful for plotting inequalities.
```python
region_plot(cos(x^2+y^2) <= 0, (x, -3, 3), (y, -3, 3),aspect_ratio=1)
region_plot(sin(x)*sin(y) >= 1/4, (x,-10,10), (y,-10,10), incol='yellow',
			bordercol='black', borderstyle='dashed',
			plot_points=250,aspect_ratio=1)
```

## Derivatives
```python
f.diff(x); f.gradient(); f.hessian()
```
Those give the derivative with respect to $x$, the [[Vector Calculus#Gradient|gradient]] and the [[Vector Calculus#Hessian|hessian]] (matrix) respectively.
