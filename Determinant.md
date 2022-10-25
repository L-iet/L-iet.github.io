The determinant is (related to) the norm of a matrix. The determinant has the following properties:
Let
$$A = \begin{bmatrix}
a&  b\\
c & d
\end{bmatrix}; \
B = \begin{bmatrix}
ka&  kb\\
c & d
\end{bmatrix}; \
C = \begin{bmatrix}
e&  f\\
c & d
\end{bmatrix}\\$$
$$
\begin{align}
\text{det}\biggl(\begin{bmatrix}
a+e& b+f\\
c& d
\end{bmatrix}\biggr) &= 
\text{det}\biggl(\begin{bmatrix}
a&  b\\
c & d
\end{bmatrix}\biggr) + \text{det}\biggl(\begin{bmatrix}
e&  f\\
c & d
\end{bmatrix}\biggr) \tag{1}\\
\text{det}\biggl(\begin{bmatrix}
a+kc&  b+kd\\
c & d
\end{bmatrix}\biggr) &= \text{det}\biggl(\begin{bmatrix}
a&  b\\
c & d
\end{bmatrix}\biggr)\\
\text{det}(B)&= k\ \text{det}(A)\\
\end{align}
$$
The second and third identities follow from Equation $1$.

$$
\text{det}(A) = \sum_{j=1}^n (-1)^{i+j} A_{ij}\text{det}(M_{ij})
$$
where $A_{ij}$ is the element on row $i$, column $j$ of $A$, an $n \times n$ matrix, and $M_{ij}$ is the minor of $A_{ij}$ in matrix $A$.


determinant

determinant
