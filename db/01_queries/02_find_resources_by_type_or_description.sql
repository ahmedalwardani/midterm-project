select resources.*
from resources
where type = 'artie' or description like ('%project%');
