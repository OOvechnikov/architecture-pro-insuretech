http {
    server_tokens off;
    
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/m;
    
    upstream backend_servers {
        server backend1.example.com;
        server backend2.example.com;
        server backend3.example.com;
    }

    server {
        listen 80;

        location / {
            limit_req zone=api_limit burst=5 nodelay;
            
            limit_req_status 429;
            
            proxy_pass http://backend_servers;
            proxy_connect_timeout 5s;
            proxy_read_timeout 30s;
        }
    }
}